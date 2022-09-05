package sg.edu.nus.prs.domain.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.purchase.ExchangeRateDetail;
import sg.edu.nus.prs.domain.user.NUSNETDetail;
import sg.edu.nus.prs.http.sap.domain.ExchangeRateResponseData;
import sg.edu.nus.prs.http.sap.domain.StaffParticsData;
import sg.edu.nus.prs.util.Constants;

import java.util.Locale;

@Component
public class ExchangeRateDetailsModelMapper {


    private ModelMapper modelMapper;

	@Autowired
	public ExchangeRateDetailsModelMapper(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
	}
	public ExchangeRateDetail intObjectToDomainObject(ExchangeRateResponseData intObj) { 
		ExchangeRateDetail detail = modelMapper.map(intObj, ExchangeRateDetail.class);
		//ExchangeRateDetail detail = new ExchangeRateDetail();
		detail.setRate(intObj.getRate());
		detail.setToCurrency(intObj.getToCurrency());
		
		return detail;
	}

}
