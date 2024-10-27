// 실행법 : node histogram.js < 텍스트파일

// 이 클래스는 맵을 확장한다.
class DefaultMap extends Map {
    // `defaultValue`는 기본값이다.
    constructor(defaultValue) {
        super(); // 슈퍼 클래스 생성자를 호출한다.
        this.defaultValue = defaultValue;
    }

    get(key) {
        if (this.has(key)) {
            return super.get(key);
        } else {
            // 키가 없으면 기본값을 반환한다.
            return this.defaultValue;
        }
    }
}

class Histogram {
    constructor() {
        this.letterCounts = new DefaultMap(0);
        this.totalLetters = 0;
    }

    // 텍스를 받아서 히스토그램을 업데이트 한다.
    add(text) {
        text = text.replace(/\s/g, "").toUpperCase();
        for (let character of text) {
            // 이전 회수를 가져온다.
            let count = this.letterCounts.get(character);
            this.letterCounts.set(character, count + 1);
            this.totalLetters++;
        }
    }

    toString() {
        // 맵을 [key, value] 배열로 변환한다.
        let entries = [...this.letterCounts];

        entries.sort((a, b) => {
            if (a[1] === b[1]) {
                // 횟수가 같으면 알파벳 순으로 정렬한다.
                return a[0] < b[0] ? -1 : 1;
            } else {
                // 횟수가 큰 것이 앞으로 온다.
                return b[1] - a[1];
            }
        });

        // 횟수를 퍼센트로 변환한다.
        for (let entry of entries) {
            entry[1] = (entry[1] / this.totalLetters) * 100;
        }

        entries = entries.filter((entry) => entry[1] >= 1);

        let lines = entries.map(
            ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
        );

        return lines.join("\n");
    }
}

async function HistogramFromStdin() {
    process.stdin.setEncoding("utf-8");
    let histogram = new Histogram();
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }

    return histogram;
}

HistogramFromStdin().then((histogram) => {
    console.log(histogram.toString());
});
