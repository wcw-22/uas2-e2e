package sg.edu.nus.prs.domain.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.purchase.PurchaseOrderChangeEvent;
import sg.edu.nus.prs.domain.purchase.PurchaseOrderChangeEventForm;

@Component
public class PurchaseOrderChangeEventMapper {

	public List<PurchaseOrderChangeEventForm> toPurchaseOrderChangeEvents(
			List<PurchaseOrderChangeEvent> poChangeEvents) {

		List<PurchaseOrderChangeEventForm> poChangeEventForms = poChangeEvents.stream()
				.map(e -> this.toPurchaseOrderChangeEvent(e)).collect(Collectors.toList());
		return poChangeEventForms;

	}

	public PurchaseOrderChangeEventForm toPurchaseOrderChangeEvent(PurchaseOrderChangeEvent poChangeEvent) {

		PurchaseOrderChangeEventForm poChangeEventForm = new PurchaseOrderChangeEventForm();
		poChangeEventForm.setId(poChangeEvent.getId());
		poChangeEventForm.setDate(poChangeEvent.getDate());
		poChangeEventForm.setSingingAuthorityUserId(poChangeEvent.getSingingAuthorityUserId());
		poChangeEventForm.setSigningAuthorifyEmail(poChangeEvent.getSigningAuthorifyEmail());
		poChangeEventForm.setType(poChangeEvent.getType());

		return poChangeEventForm;

	}
}
