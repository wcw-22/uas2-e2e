package sg.edu.nus.prs.domain.converters;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.convert.converter.Converter;
import sg.edu.nus.prs.domain.purchase.RequestType;

public class RequestTypeConverter implements Converter<String, RequestType> {
    @Override
    public RequestType convert(String source) {
        for (RequestType type: RequestType.values()) {
            if (StringUtils.equals(type.getDescription(), source)) {
                return type;
            }
        }

        return null;
    }
}
