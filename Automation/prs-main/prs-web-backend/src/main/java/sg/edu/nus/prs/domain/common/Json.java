package sg.edu.nus.prs.domain.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import sg.edu.nus.prs.exception.PRSExceptionCode;
import sg.edu.nus.prs.exception.PRSRuntimException;

import java.io.IOException;

public class Json<T> {
	public Json(String jsonString) {
		this.jsonString = jsonString;
	}
	public Json(T obj) {
		this.object = obj;
	}
	
    public void setJsonString(String jsonString) {
		this.jsonString = jsonString;
	}

    public T getObject(Class<T> cls) {
		if (object == null && StringUtils.isNotEmpty(jsonString)) {
			try {
				object = mapper.readValue(jsonString, cls);
			} catch (IOException e) {
				throw new PRSRuntimException(PRSExceptionCode.PRS_EXCEPTION_WHEN_FROM_STRING_TO_OBJECT);
			}
		}

		return object;
	}
    
    public T getObject(TypeReference<T> valueTypeRef) {
		if (object == null && StringUtils.isNotEmpty(jsonString)) {
			try {
				object = mapper.readValue(jsonString, valueTypeRef);
			} catch (IOException e) {
				throw new PRSRuntimException(PRSExceptionCode.PRS_EXCEPTION_WHEN_FROM_STRING_TO_OBJECT);
			}
		}

		return object;
	}
    

	public String getJsonString() {
		if(StringUtils.isEmpty(jsonString)) {		
		try {
			return mapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			throw new PRSRuntimException(PRSExceptionCode.PRS_EXCEPTION_WHEN_FROM_OBJECT_TO_STRING);
		}
		}
		return jsonString;
	}
    
	private String jsonString;
	private T object;
	private static final ObjectMapper mapper = new ObjectMapper();
}

