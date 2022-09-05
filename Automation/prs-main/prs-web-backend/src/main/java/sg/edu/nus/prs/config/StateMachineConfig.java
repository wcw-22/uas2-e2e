package sg.edu.nus.prs.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.statemachine.config.model.StateMachineModelFactory;
import org.springframework.statemachine.uml.UmlStateMachineModelFactory;

@Configuration
public class StateMachineConfig {
    private static final Logger logger = LoggerFactory.getLogger(StateMachineConfig.class);

    @Bean("requestModelFactory")
    public StateMachineModelFactory<String, String> requestModelFactory() {
        // Do not unset. Leaves thread blocking unloading of ClassLoader when undeploying otherwise.
        try {
            System.setProperty("org.eclipse.emf.common.util.ReferenceClearingQueue", "false");
        } catch (SecurityException e) {
            logger.warn("Unable to set property to turn off ReferenceClearingQueue: {}", e.getMessage());
        }
        return new UmlStateMachineModelFactory("classpath:statemachine/RequestStateMachine.uml");
    }

    @Bean("collectionModelFactory")
    public StateMachineModelFactory<String, String> collectionModelFactory() {
        // Do not unset. Leaves thread blocking unloading of ClassLoader when undeploying otherwise.
        try {
            System.setProperty("org.eclipse.emf.common.util.ReferenceClearingQueue", "false");
        } catch (SecurityException e) {
            logger.warn("Unable to set property to turn off ReferenceClearingQueue: {}", e.getMessage());
        }

        return new UmlStateMachineModelFactory("classpath:statemachine/CollectionStateMachine.uml");
    }
}
