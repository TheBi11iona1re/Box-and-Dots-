#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

// Also in main.rs
fn main() {
  tauri::Builder::default()
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![my_custom_command])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}

#[tauri::command]
fn write_log(msg: String) -> Result<(), String> {
  use std::fs::OpenOptions;
  use std::io::prelude::*;
  use std::path::PathBuf;
  use dirs::home_dir;

  let mut path = PathBuf::new();
  path.push(home_dir().ok_or("Cannot find home directory")?);
  path.push("logs.txt");

  let mut file = OpenOptions::new()
    .write(true)
    .append(true)
    .create(true)
    .open(path)
    .map_err(|e| e.to_string())?;

  writeln!(file, "{}", msg).map_err(|e| e.to_string())
}





#[tauri::command]
fn my_custom_command() {
  println!("Main Menu!");
}
