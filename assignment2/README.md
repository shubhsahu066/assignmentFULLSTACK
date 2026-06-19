# QR Attendance Bot

A Telegram bot that marks attendance by scanning the QR code on an IITK ID card.

## Features

- QR code decoding
- Roll number extraction
- Attendance tracking
- Duplicate attendance prevention
- Attendance report generation

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
BOT_TOKEN=your_bot_token
```

## Run

```bash
node bot.js
```

## Usage

### Start the bot

```text
/start
```

### Mark attendance

Send a photo of an IITK ID card containing a QR code.

### View attendance

```text
/report
```

## Project Files

```text
bot.js          Telegram bot logic
qr.js           QR code decoder
parser.js       Roll number extraction
attendance.js   Attendance management
```

## Notes

- Attendance data is stored in `attendance.json`.
- Roll numbers are validated before attendance is marked.
- Duplicate entries are not allowed.

