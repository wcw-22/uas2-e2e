package sg.edu.nus.prs.domain.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.common.PhyForm;
import sg.edu.nus.prs.domain.common.PhysicalForm;
import sg.edu.nus.prs.domain.common.UnitMeasure;

import java.util.ArrayList;
import java.util.List;

@Component
public class PhysicalFormModelMapper {

	private ModelMapper modelMapper;

	@Autowired
	public PhysicalFormModelMapper(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
	}

	public List<PhyForm> domainObjectListToFormList(List<PhysicalForm> domainObjects) {
		List<PhyForm> physicalFormForms = new ArrayList<PhyForm>();
		
		for(PhysicalForm domainObj : domainObjects) {
			PhyForm physicalFormForm = domainObjectToForm(domainObj);
			
			physicalFormForms.add(physicalFormForm);
		}
		
		return physicalFormForms;
	}
	
	public PhyForm domainObjectToForm(PhysicalForm domainObject) {
		PhyForm physicalFormForm = modelMapper.map(domainObject, PhyForm.class);

		return physicalFormForm;
	}
}
