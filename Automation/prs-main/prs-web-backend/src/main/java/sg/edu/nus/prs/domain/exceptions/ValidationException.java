package sg.edu.nus.prs.domain.exceptions;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ValidationException extends Exception {
    private List<String> errors;

    public ValidationException(String error) {
        this.errors = Collections.singletonList(error);
    }

    public ValidationException(List<String> errors) {
        this.errors = new ArrayList<>(errors);
    }

    public List<String> getErrors() {
        return errors;
    }

    @Override
    public String getMessage() {
        return "Validation Errors: [\n" + String.join("\n", this.errors) + "\n]\n";
    }
}
