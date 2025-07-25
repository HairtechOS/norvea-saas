import LDClient from 'launchdarkly-node-server-sdk';

const LD_SDK_KEY = process.env.LAUNCHDARKLY_SDK_KEY || '';
export const ldClient = LDClient.init(LD_SDK_KEY);

export async function isFeatureEnabled(flagKey: string, user: { key: string }) {
  await ldClient.waitForInitialization();
  return ldClient.variation(flagKey, user, false);
} 