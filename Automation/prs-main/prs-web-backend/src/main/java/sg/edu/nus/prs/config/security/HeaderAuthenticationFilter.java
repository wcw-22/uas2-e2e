package sg.edu.nus.prs.config.security;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.GenericFilterBean;
import sg.edu.nus.prs.dao.APIKeyDAO;
import sg.edu.nus.prs.domain.security.APIKey;
import sg.edu.nus.prs.util.Constants;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Objects;

public class HeaderAuthenticationFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // Check for header authentication.
        // Follow ESB format.
        // X-APP-API, X-LMPRS-API
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String xAppApi = httpRequest.getHeader(Constants.INBOUND_APP_API_HEADER);
        String xLmprsApi = httpRequest.getHeader(Constants.INBOUND_API_KEY_HEADER);

        String contextPrefix = httpRequest.getContextPath();
        String url = httpRequest.getRequestURI();

        if (url.startsWith(contextPrefix)) {
            url = url.substring(contextPrefix.length());
        }

        if (url.startsWith("/inbound")) {
            if (validate(request, xAppApi, xLmprsApi, url)) {
                GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_SERVICE");
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(xAppApi,
                                xAppApi, Collections.singletonList(authority)));

                chain.doFilter(request, response);
            } else {
                HttpServletResponse httpResponse = (HttpServletResponse) response;
                httpResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
            }
        } else {
            chain.doFilter(request, response);
        }
    }

    private APIKeyDAO getApiKeyDAO(ServletRequest request) {
        ServletContext servletContext = request.getServletContext();
        WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);

        return Objects.requireNonNull(webApplicationContext).getBean(APIKeyDAO.class);
    }

    private boolean validate(ServletRequest request, String appApi, String lmprsApi, String url) {
        List<APIKey> apiKeyList = getApiKeyDAO(request).getAPIKeysForAppId(appApi, new Date());

        if (CollectionUtils.isNotEmpty(apiKeyList)) {
            for (APIKey apiKey: apiKeyList) {
                if (BCrypt.checkpw(lmprsApi, apiKey.getHashedKey())) {
                    if (url.startsWith(apiKey.getUrlPrefix())) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
