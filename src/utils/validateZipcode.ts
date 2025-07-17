import type { ZipError } from "../types/errors";

export function validateZipcode(zipcode: string): ZipError | null {
    // Check for invalid characters (only digits and hyphen allowed)
    if (!/^[0-9-]+$/.test(zipcode)) {
        return 'invalidCharacters';
    }

    // Check for valid format (either 7 digits or 8 digits with hyphen)
    if (!/^(\d{3}-\d{4}|\d{7})$/.test(zipcode)) {
        return 'invalidFormat';
    }

    // If all checks pass, return null indicating no error
    return null;
}