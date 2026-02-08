use std::collections::HashMap;
use serde::{Serialize, Deserialize};
use chrono::{DateTime, Utc};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum GpreError {
    #[error("Rule processing error: {0}")]
    RuleProcessing(String),
    #[error("Serialization error: {0}")]
    Serialization(#[from] serde_json::Error),
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
}

pub type GpreResult<T> = Result<T, GpreError>;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct Rule {
    pub id: String,
    pub name: String,
    pub content: String,
    pub active: bool,
}

#[derive(Debug, Clone, Default)]
pub struct ImpactContext {
    pub agent_id: String,
    pub state: HashMap<String, serde_json::Value>,
    pub last_updated: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ValidationResult {
    pub rule_id: String,
    pub applied: bool,
    pub outcome: Option<serde_json::Value>,
    pub timestamp: DateTime<Utc>,
}
