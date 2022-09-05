package sg.edu.nus.prs.domain.common;

public interface PRSModelMapper {

	PRSDomainObject formToDomainObject(PRSForm form);
	
	PRSForm domainObjectToForm(PRSDomainObject domainObject);

}
