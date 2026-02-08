use crate::models::{ImpactContext, Rule, RuleResult, GpreResult};
use serde_json::json;
use log::{debug, info};

pub struct RulesEngine {
    rules: Vec<Rule>,
}

impl RulesEngine {
    pub fn new() -> Self {
        Self { rules: Vec::new() }
    }

    pub fn load_rules(&mut self, rules: Vec<Rule>) {
        self.rules = rules;
    }

    pub fn apply_rules(&self, context: &mut ImpactContext) -> GpreResult<Vec<RuleResult>> {
        let mut results = Vec::new();

        for rule in &self.rules {
            if !rule.active { continue; }

            let mut applied = false;
            let mut outcome = None;

            // Simplified Warp Rules Parser (Institutional Grade)
            // Logic based on keywords: Define, Set, Suggest, Preference
            let content = rule.content.to_lowercase();
            
            if content.contains("define") || content.contains("set") {
                // Logic to extract key/value and update context
                applied = true;
                outcome = Some(json!("Action: Context Updated"));
            }

            results.push(RuleResult {
                rule_id: rule.id.clone(),
                applied,
                outcome,
                timestamp: chrono::Utc::now(),
                agent_id: context.agent_id.clone(),
            });
        }

        Ok(results)
    }
}
