import fs from 'fs';
const buf = fs.readFileSync('protected-files/pdfs/beginner_home_workout_v1.pdf');
const str = buf.toString('latin1');
const metaIdx = str.indexOf('471 0 obj');
if (metaIdx !== -1) {
  console.log(str.slice(metaIdx, metaIdx + 1500));
} else {
  console.log('Object 471 not found');
}
