// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use reqwest::Client;
use serde_json::json;
use serde::Serialize;
#[derive(Serialize)]
struct ReqForm {
    from: String,
    to: String,
    q: String,
}
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn translate(from: &str,to: &str,q: &str){
    let future = request(from, to, q);
    tokio::runtime::Runtime::new().unwrap().block_on(future);
}
async fn request(from: &str,to: &str,q: &str) -> Result<(),Box<dyn std::error::Error>> {
    let url = "https://ifanyi.iciba.com/index.php?c=trans&m=fy&client=6&auth_user=key_web_new_fanyi&sign=jRpaXalAyNsT8YY3J48d6NRriqVIAJSQ%2BxmfU0q7dIE%3D";
    let client = Client::new();
    let request_data = ReqForm {
        from: from.to_string(),
        to: to.to_string(),
        q: q.to_string(),
    };
    let body = serde_json::to_string(&request_data)?;
    let response = client.post(url).body(body).send().await?;
    let result = response.text().await?;
    println!("{}",result);
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![translate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
