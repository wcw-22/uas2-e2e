package sg.edu.nus.prs.config.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Objects;

public class SingleSessionAuthenticationFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // Check for header authentication.
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpSession session = httpRequest.getSession(false);

        if (session != null) {
            // Ensure that the session is not invalidated.
            SessionRegistry registry = getSessionRegistry(request);
            SessionInformation si = registry.getSessionInformation(session.getId());
            if (si != null && si.isExpired()) {
                HttpServletResponse httpResponse = (HttpServletResponse) response;
                httpResponse.setStatus(HttpStatus.UNAUTHORIZED.value());

                registry.removeSessionInformation(session.getId());
                session.invalidate();

                return;
            }
        }

        chain.doFilter(request, response);
    }

    private SessionRegistry getSessionRegistry(ServletRequest request) {
        ServletContext servletContext = request.getServletContext();
        WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);

        return Objects.requireNonNull(webApplicationContext).getBean(SessionRegistry.class);
    }
}
