export function damerauLevenshteinDistance(str1, str2) {
    if (str1 == null) {
        return str2.length
    } else if (str2 == null) {
        return str1.length
    } else {
        var d = []
        for (var i = 0; i <= str1.length; i++) {
            var list = []
            for (var j = 0; j <= str2.length; j++) {
                list.push(0)
            }
            d.push(list)
        }
        for (var i = 0; i <= str1.length; i++) {
            d[i][0] = i
            for (var j = 0; j <= str2.length; j++) {
                d[0][j] = j
            }
        }

        for (var i = 1; i <= str1.length; i++) {
            var cost = 0
            for (let j = 1; j <= str2.length; j++) {
                if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
                    cost = 0;
                } else {
                    cost = 1;
                }
                d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)

                if (i > 1 && j > 1 && str1[i - 1] === str2[j - 2] && str1[i - 2] === str2[j - 1]) {
                    d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost)
                }
            }
        }
        return d[str1.length][str2.length];
    }
}

