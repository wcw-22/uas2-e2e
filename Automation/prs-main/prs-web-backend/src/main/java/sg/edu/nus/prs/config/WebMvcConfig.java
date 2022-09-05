package sg.edu.nus.prs.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.io.Resource;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import sg.edu.nus.prs.domain.converters.RequestTypeConverter;
import sg.edu.nus.prs.util.LogMDCInterceptor;

import java.io.IOException;
import java.util.List;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
    @Bean
    public InternalResourceViewResolver jspViewResolver() {
        // Define static views.
        InternalResourceViewResolver resolver= new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/jsp/");
        resolver.setSuffix(".jsp");
        return resolver;
    }

    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasenames(
                "classpath:messages",
                "classpath:errors",
                "classpath:email",
                "classpath:reports" 
        );

        return messageSource;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Register MVC interceptors.
        registry.addInterceptor(new LogMDCInterceptor());
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new RequestTypeConverter());
    }

    @Value("${angular.app.location:/resources/frontend/}")
    private String angularAppLocation;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/resources/**")
                .addResourceLocations("/resources/");

        // Angular App Resources.
        registry
                .addResourceHandler("/app/**")
                .addResourceLocations(angularAppLocation)
                .resourceChain(false)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        // In Angular, when user reloads the page, return the base index page if not found.
                        Resource requestedResource = location.createRelative(resourcePath);
                        return requestedResource.exists() && requestedResource.isReadable()
                                ? requestedResource
                                : location.createRelative("index.html");
                    }
                });

        registry
                .addResourceHandler("/assets/**")
                .addResourceLocations("/resources/frontend/assets/");
    }
    
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    /* Customize Jackson */
    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        for (HttpMessageConverter<?> httpConverter : converters) {
            if (httpConverter instanceof MappingJackson2HttpMessageConverter) {
                // register the configured object mapper to HttpMessageconter
                ObjectMapper mapper = new ObjectMapper();

                mapper.setDefaultPropertyInclusion(JsonInclude.Include.NON_NULL);
                mapper.enable(
                        DeserializationFeature.READ_UNKNOWN_ENUM_VALUES_AS_NULL
                );
                mapper.disable(
                        DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES
                );

                ((MappingJackson2HttpMessageConverter) httpConverter).setObjectMapper(mapper);
            }
        }
    }
}
