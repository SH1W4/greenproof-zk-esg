use gpre::{RulesEngine, ImpactContext, Rule};
use std::collections::HashMap;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("--- GreenProof Rule Engine (GPRE) CLI ---");

    let mut engine = RulesEngine::new();

    // Mock Rule: Standard Institutional ESG Compliance
    let rule = Rule {
        id: "esg_integrity_01".to_string(),
        name: "ESG Integrity Check".to_string(),
        content: "DEFINE impact_threshold = 80; SET compliance_status = VALID;".to_string(),
        active: true,
    };

    engine.load_rules(vec![rule]);

    let mut context = ImpactContext {
        agent_id: "gp_validator_04".to_string(),
        state: HashMap::new(),
        last_updated: chrono::Utc::now(),
    };

    println!("Applying rules to context...");
    let results = engine.apply_rules(&mut context)?;

    for result in results {
        println!("Rule: {} | Applied: {} | Outcome: {:?}", result.rule_id, result.applied, result.outcome);
    }

    println!("\n✅ Integrity validation complete.");
    Ok(())
}
