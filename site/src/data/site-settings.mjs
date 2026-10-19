// Shared with jameshoward.us and CMNA at the owner's request.
export const analyticsId = (process.env.PUBLIC_GA_ID ?? 'G-FSDET4HG4L').trim();
if (analyticsId && !/^G-[A-Z0-9]{6,20}$/.test(analyticsId)) throw new Error('PUBLIC_GA_ID must be blank or a valid GA4 measurement ID.');
export const consentVersion = `1:${analyticsId || 'disabled'}`;
