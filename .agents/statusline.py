import sys
import subprocess
import os

def main():
    script_path = os.path.expanduser("~/.claude/statusline.sh")
    try:
        input_data = sys.stdin.read()
        process = subprocess.Popen(
            [script_path],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        stdout, _ = process.communicate(input=input_data)
        if stdout:
            print(stdout, end="")
    except Exception:
        pass

if __name__ == "__main__":
    main()
