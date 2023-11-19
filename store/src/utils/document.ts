export function validateBrazilDocument(document: string) {
    const cleanCPF = document.replace(/\D/g, '');

    if (cleanCPF.length !== 11) {
        return false;
    }

    // verifica se não é uma sequência de digitos repetidos. Ex.: 111.111.111-11
    const invalidCPFs = Array.from({ length: 10 }, (_, i) => `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`);
    if (invalidCPFs.includes(cleanCPF)) {
        return false;
    }

    // Calcula o primeiro dígito de verificação
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let digit = sum % 11;
    digit = digit < 2 ? 0 : 11 - digit;

    // Verifica o primeiro dígito de verificação
    if (parseInt(cleanCPF.charAt(9)) !== digit) {
        return false;
    }

    // Calcula o segundo dígito de verificação
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    digit = sum % 11;
    digit = digit < 2 ? 0 : 11 - digit;

    // Verifica o segundo dígito de verificação
    if (parseInt(cleanCPF.charAt(10)) !== digit) {
        return false;
    }

    return true;
};
