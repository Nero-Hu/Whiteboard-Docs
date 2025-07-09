#!/usr/bin/env python3
"""
文档同步工具使用示例
"""

import subprocess
import sys
from pathlib import Path

def run_command(cmd, description):
    """运行命令并显示结果"""
    print(f"\n🔧 {description}")
    print(f"命令: {cmd}")
    print("-" * 50)
    
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ 执行成功")
            if result.stdout:
                print("输出:")
                print(result.stdout)
        else:
            print("❌ 执行失败")
            if result.stderr:
                print("错误:")
                print(result.stderr)
    except Exception as e:
        print(f"❌ 执行异常: {e}")

def main():
    """主函数"""
    print("📖 文档同步工具使用示例")
    print("=" * 60)
    
    # 检查当前目录
    current_dir = Path.cwd()
    print(f"当前目录: {current_dir}")
    
    # 检查工具是否存在
    sync_script = current_dir / "tools" / "sync_docs.py"
    if not sync_script.exists():
        print("❌ 找不到 sync_docs.py 脚本")
        print("请确保在正确的目录下运行此示例")
        return
    
    print("✅ 找到同步脚本")
    
    # 示例1：测试模式
    run_command(
        "python tools/sync_docs.py --dry-run --platform android",
        "示例1：测试模式 - 检测Android平台变更"
    )
    
    # 示例2：交互模式
    run_command(
        "python tools/sync_docs.py --platform ios",
        "示例2：交互模式 - 同步iOS平台文档"
    )
    
    # 示例3：非交互模式
    run_command(
        "python tools/sync_docs.py --non-interactive --platform web",
        "示例3：非交互模式 - 同步Web平台文档"
    )
    
    # 示例4：强制同步
    run_command(
        "python tools/sync_docs.py --force --platform android",
        "示例4：强制同步 - 忽略变更检测"
    )
    
    # 示例5：同步所有平台
    run_command(
        "python tools/sync_docs.py --dry-run",
        "示例5：测试模式 - 检测所有平台变更"
    )
    
    print("\n📋 使用建议:")
    print("1. 首次使用建议先运行 --dry-run 模式")
    print("2. 开发环境使用默认的交互模式")
    print("3. CI/CD环境使用 --non-interactive 参数")
    print("4. 遇到问题时查看 logs/ 目录下的日志文件")
    print("5. 确保配置文件 config/sync_config.yaml 正确设置")

if __name__ == '__main__':
    main() 