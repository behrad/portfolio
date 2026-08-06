import sys
import json
import os
import subprocess

# ANSI Escape Codes for Premium Styling
RESET = "\033[0m"
BOLD = "\033[1m"
DIM = "\033[2m"

# Colors
CYAN = "\033[36m"
BLUE = "\033[34m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
RED = "\033[31m"
MAGENTA = "\033[35m"
WHITE = "\033[37m"

def get_git_branch(cwd):
    try:
        # Run git command to get current branch
        result = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=2
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except Exception:
        pass
    return None

def make_progress_bar(ratio, width=8, fill_char="█", empty_char="░"):
    ratio = max(0.0, min(1.0, ratio))
    filled_len = int(round(ratio * width))
    empty_len = width - filled_len
    
    # Choose color based on usage ratio
    if ratio < 0.5:
        color = GREEN
    elif ratio < 0.8:
        color = YELLOW
    else:
        color = RED
        
    return f"{color}{fill_char * filled_len}{DIM}{empty_char * empty_len}{RESET}"

def main():
    try:
        # Read JSON payload from stdin
        input_data = sys.stdin.read().strip()
        if not input_data:
            data = {}
        else:
            data = json.loads(input_data)
    except Exception:
        data = {}

    # 1. CWD / Directory
    # Extract cwd from payload or env or current dir
    cwd = data.get("workspace", {}).get("current_dir") or data.get("cwd") or os.getcwd()
    dir_name = os.path.basename(cwd) or cwd
    if len(dir_name) > 15:
        dir_name = dir_name[:12] + "..."

    # 2. Git Branch
    branch = get_git_branch(cwd)
    branch_str = f" 🌲 {BLUE}{branch}{RESET}" if branch else ""

    # 3. Model Name
    model_data = data.get("model", {})
    if isinstance(model_data, dict):
        model_name = model_data.get("display_name") or model_data.get("id") or "Gemini 3.5"
    else:
        model_name = str(model_data) or "Gemini 3.5"
        
    # Shorten model name for display
    if "flash" in model_name.lower():
        model_display = f"{CYAN}Gemini Flash{RESET}"
    elif "pro" in model_name.lower():
        model_display = f"{MAGENTA}Gemini Pro{RESET}"
    else:
        model_display = f"{CYAN}{model_name[:12]}{RESET}"

    # 4. Effort Level
    effort_data = data.get("effort", {})
    if isinstance(effort_data, dict):
        effort = effort_data.get("level") or "medium"
    else:
        effort = str(effort_data) or "medium"
    effort_display = f"{WHITE}{effort.upper()}{RESET}"

    # 5. Token Usage & Progress Bar
    # Extract total input / output tokens
    context_data = data.get("context_window", {})
    input_tokens = context_data.get("total_input_tokens") or data.get("usage", {}).get("input_tokens") or 0
    output_tokens = context_data.get("total_output_tokens") or data.get("usage", {}).get("output_tokens") or 0
    total_tokens = input_tokens + output_tokens
    
    # 6. Remaining / Used Context window percentage
    used_pct = context_data.get("used_percentage")
    if used_pct is None:
        # Try to calculate or estimate
        used_pct = 0.0
    else:
        try:
            used_pct = float(used_pct)
            # If used_pct is in 0-100 format, normalize to 0-1
            if used_pct > 1.0:
                used_pct = used_pct / 100.0
        except ValueError:
            used_pct = 0.0

    remaining_pct = 1.0 - used_pct
    
    # Progress bars
    usage_bar = make_progress_bar(used_pct)
    rem_bar = make_progress_bar(remaining_pct)

    # Format the token details string
    token_str = f"In/Out: {input_tokens}/{output_tokens}"
    pct_str = f"{int(used_pct * 100)}%"
    rem_pct_str = f"{int(remaining_pct * 100)}%"

    # Construct the final status bar output
    # Formatting parts:
    # CWD | Git Branch | Model | Effort | Token Usage Bar | Remaining Bar
    parts = [
        f"📂 {BOLD}{dir_name}{RESET}{branch_str}",
        f"🤖 {model_display}",
        f"⚡ Effort: {effort_display}",
        f"📊 Used: {usage_bar} {pct_str} ({token_str})",
        f"🔋 Free: {rem_bar} {rem_pct_str}"
    ]
    
    # Joining with premium thin divider
    divider = f" {DIM}┃{RESET} "
    status_line = divider.join(parts)
    
    # Print to stdout
    print(status_line)

if __name__ == "__main__":
    main()
