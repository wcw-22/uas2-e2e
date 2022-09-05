package sg.edu.nus.prs.domain.mapper;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.purchase.Document;
import sg.edu.nus.prs.domain.purchase.PurchaseAttachment;
import sg.edu.nus.prs.util.Constants;

import java.util.UUID;

@Component
public class DocumentModelMapper {
    public Document purchaseQuotationAttachmentToDocument(PurchaseAttachment attachment) {
        Document document = new Document();
        document.setDescription(attachment.getDescription());
        document.setFilename(attachment.getFilename());
        document.setDocumentType(attachment.getDocumentType());
        document.setFilesize(attachment.getDataSize());
        document.setData(attachment.getData());

        // If this is not a temporary id, set the id.
        if (StringUtils.isNotEmpty(attachment.getReferenceId())
            && !attachment.getReferenceId().startsWith(Constants.TMP_ATTACHMENT_PREFIX)) {
            document.setId(attachment.getReferenceId());
        }

        return document;
    }

    public PurchaseAttachment documentToPurchaseQuotationAttachment(Document document, Boolean copyFlag) {

        PurchaseAttachment attachment = new PurchaseAttachment();
        attachment.setDescription(document.getDescription());
        attachment.setFilename(document.getFilename());
        attachment.setDocumentType(document.getDocumentType());
        attachment.setData(document.getData());

        if(!copyFlag) {
            if (document.getId() != null) {
                attachment.setReferenceId(document.getId());
            }
        } else {
            attachment.setReferenceId(Constants.TMP_ATTACHMENT_PREFIX + UUID.randomUUID());
        }


        return attachment;
    }
}
