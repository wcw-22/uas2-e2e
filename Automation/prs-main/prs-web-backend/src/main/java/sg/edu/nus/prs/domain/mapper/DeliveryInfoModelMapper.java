package sg.edu.nus.prs.domain.mapper;

import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.purchase.DeliveryInfo;
import sg.edu.nus.prs.domain.purchase.PurchaseQuotationSummary;

@SuppressWarnings("Duplicates")
@Component
public class DeliveryInfoModelMapper {
    public DeliveryInfo toDeliveryInfo(PurchaseQuotationSummary summary) {
        DeliveryInfo deliveryInfo = new DeliveryInfo();

        if (summary != null) {
            deliveryInfo.setRequestorName(summary.getRequestorName());
            deliveryInfo.setDeliveryAddress(summary.getDeliveryAddress());
            deliveryInfo.setBillingAddress(summary.getBillingAddress());
            deliveryInfo.setRequestorEmail(summary.getRequestorEmail());
            deliveryInfo.setRequestorPhone(summary.getRequestorPhone());
        }

        return deliveryInfo;
    }

    public PurchaseQuotationSummary toPurchaseQuotationSummary(DeliveryInfo deliveryInfo) {
        PurchaseQuotationSummary summary = new PurchaseQuotationSummary();

        if (deliveryInfo != null) {
            summary.setRequestorName(deliveryInfo.getRequestorName());
            summary.setDeliveryAddress(deliveryInfo.getDeliveryAddress());
            summary.setBillingAddress(deliveryInfo.getBillingAddress());
            summary.setRequestorEmail(deliveryInfo.getRequestorEmail());
            summary.setRequestorPhone(deliveryInfo.getRequestorPhone());
        }

        return summary;
    }
}
