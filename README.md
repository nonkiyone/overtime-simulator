# 残時間シミュレーター (Zantime)

Japanese | [English](#overtime-simulator-zantime)

勤務時間や残業予定をシミュレーションし、月の目標稼働時間に達するかどうかを可視化するWebツールです。

## 特徴
- **単一ファイル構成**: `index.html` 1ファイルだけで動作します。
- **データ永続化**: ブラウザの `localStorage` への自動保存に加え、設定を JSON ファイルとしてバックアップ・復元できます。
- **柔軟なカレンダー**: 稼働日や残業予定日をカレンダー形式で直感的に選択可能。
- **詳細な計算**: 複数の休憩時間や、日ごとの手動時間修正（モーダル入力）に対応。
- **エクスポート**: 計算結果を Excel (CSV) 形式で書き出すことができます。

## 使い方
1. `index.html` をブラウザで開きます。
2. デフォルトの開始時間、終了時間、休憩時間を設定します。
3. 月の目標稼働時間を入力します。
4. カレンダーで稼働日（緑）や残業予定日（青）を選択します。
5. 「計算する」ボタンを押すと、結果が表示されます。

## 開発者向け
テストを実行する場合は、Node.js がインストールされた環境で以下を実行してください。
```bash
npm install
npm test
```

---

# Overtime Simulator (Zantime)

A web tool to simulate work hours and overtime, visualizing whether you meet your monthly target hours.

## Features
- **Single File Structure**: Operates entirely with a single `index.html` file.
- **Data Persistence**: Automatically saves to browser `localStorage` and supports backup/restore via JSON files.
- **Flexible Calendar**: Intuitively select workdays and scheduled overtime days in a calendar format.
- **Detailed Calculation**: Supports multiple break periods and manual daily time adjustments (via modal).
- **Export**: Export results to Excel (CSV) format.

## How to Use
1. Open `index.html` in your browser.
2. Set default start, end, and break times.
3. Enter your monthly target working hours.
4. Select workdays (green) and overtime days (blue) on the calendar.
5. Click "Calculate" to see the results.

## For Developers
To run tests, execute the following in an environment with Node.js installed:
```bash
npm install
npm test
```

## License
MIT License
