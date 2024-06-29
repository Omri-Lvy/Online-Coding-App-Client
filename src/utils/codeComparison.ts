export const normalizeCode = (code: string): string => {
    return code
        .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ''); // Remove whitespace and new lines
};

export const isCodeMatching = (studentCode: string | undefined, solutionCode: string | undefined): boolean => {
    if (!studentCode || !solutionCode) {
        return false;
    }
    const normalizedStudentCode = normalizeCode(studentCode);
    const normalizedSolutionCode = normalizeCode(solutionCode);
    return normalizedStudentCode === normalizedSolutionCode;
};