const getDefaultChangesBlock = function(conventionMode) {
    switch (conventionMode) {
        case 'williamdes':
            return [
                {
                    commits: [],
                    name: 'Added',
                    messageRegex: [/^added:/i, /^add:/i, /^test:/i],
                },
                {
                    commits: [],
                    name: 'Changed',
                    messageRegex: [/^changed:/i, /^update:/i, /^updated:/i, /^moved:/i],
                },
                {
                    commits: [],
                    name: 'Deprecated',
                    messageRegex: [/^deprecated:/i],
                },
                {
                    commits: [],
                    name: 'Removed',
                    messageRegex: [/^removed:/i, /^remove:/i],
                },
                {
                    commits: [],
                    name: 'Fixed',
                    messageRegex: [/^fixed:/i, /^fix:/i, /^fixes:/i],
                },
                {
                    commits: [],
                    name: 'Security',
                    messageRegex: [/^security:/i],
                },
                {
                    commits: [],
                    name: 'Improvements',
                    messageRegex: [/^improve:/i, /^improved:/i, /^style:/i],
                },
            ];
        case 'conventional+legacy':
            return [
                {
                    commits: [],
                    name: 'Added',
                    messageRegex: [/^added:/i, /^add:/i, /^test:/i],
                },
                {
                    commits: [],
                    name: 'Changed',
                    messageRegex: [/^changed:/i, /^update:/i, /^updated:/i, /^moved:/i],
                },
                {
                    commits: [],
                    name: 'Deprecated',
                    messageRegex: [/^deprecated:/i],
                },
                {
                    commits: [],
                    name: 'Removed',
                    messageRegex: [/^removed:/i, /^remove:/i],
                },
                {
                    commits: [],
                    name: 'Fixed',
                    messageRegex: [/^fixed:/i, /^fix:/i, /^fixes:/i],
                },
                {
                    commits: [],
                    name: 'Security',
                    messageRegex: [/^security:/i],
                },
                {
                    commits: [],
                    name: 'Improvements',
                    messageRegex: [/^improve:/i, /^improved:/i, /^style:/i],
                },
            ];
        case 'conventional':
            return [
                {
                    commits: [],
                    name: 'Added',
                    messageRegex: [/^added:/i, /^add:/i, /^test:/i],
                },
                {
                    commits: [],
                    name: 'Changed',
                    messageRegex: [/^changed:/i, /^update:/i, /^updated:/i, /^moved:/i],
                },
                {
                    commits: [],
                    name: 'Deprecated',
                    messageRegex: [/^deprecated:/i],
                },
                {
                    commits: [],
                    name: 'Removed',
                    messageRegex: [/^removed:/i, /^remove:/i],
                },
                {
                    commits: [],
                    name: 'Fixed',
                    messageRegex: [/^fixed:/i, /^fix:/i, /^fixes:/i],
                },
                {
                    commits: [],
                    name: 'Security',
                    messageRegex: [/^security:/i],
                },
                {
                    commits: [],
                    name: 'Improvements',
                    messageRegex: [/^improve:/i, /^improved:/i, /^style:/i],
                },
            ];
        default:
            return [];
    }
};

module.exports = {
    getDefaultChangesBlock: getDefaultChangesBlock,
};
