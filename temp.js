// const fs = require("fs");

// const readableStream = fs.createReadStream("./temp.md", {
//   highWaterMark: 10,
// });

// readableStream.on("readable", () => {
//   process.stdout.write(`${readableStream.read()}`);
// });

// readableStream.on("end", () => {
//   console.log("DONE");
//   const file = fs.createWriteStream("temp.md");
//   for (let i = 0; i < 10000; i++) {
//     file.write("Hello world " + i);
//   }
//   file.end();
// });
// // const file =  fs.createWriteStream("temp.md");
// // for (let i = 0; i < 10000; i++) {
// //   file.write("Hello world " + i);
// // }
// // file.end(); 
import crypto from 'crypto';
import { Transform } from 'stream';

class CodingNinjas extends Transform {
  constructor(options) {
    super(options);
    this.digester = crypto.createHash('sha256'); // Use SHA-256 hashing
  }

  _transform(chunk, encoding, callback) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding);
    this.digester.update(buffer);
    callback();
  }

  _flush(callback) {
    this.push(this.digester.digest('hex')); // Output final hash in hex format
    callback();
  }
}

// Try it out
const hashStream = new CodingNinjas();
hashStream.pipe(process.stdout); // Output to stdout

hashStream.write('hello world\n'); // Input line 1
hashStream.write('another line');  // Input line 2
hashStream.end();  // Finish the stream
