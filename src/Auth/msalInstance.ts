/*
Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  PublicClientApplication,
} from "@azure/msal-browser";

// NOTE: values set by afcli tool in .env file
const { VITE_MSAL_CLIENT_ID, VITE_MSAL_ENVIRONMENT, VITE_MSAL_TENANT_ID } =
  import.meta.env;

if (!VITE_MSAL_CLIENT_ID || !VITE_MSAL_ENVIRONMENT || !VITE_MSAL_TENANT_ID) {
  throw new Error("Missing MSAL config.");
}

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: VITE_MSAL_CLIENT_ID,
    authority: `https://${VITE_MSAL_ENVIRONMENT}/${VITE_MSAL_TENANT_ID}`,
  },
});

export async function initializeMsalInstance() {
  await msalInstance.initialize();

  // Default to using the first account if no account is active on page load
  if (
    !msalInstance.getActiveAccount() &&
    msalInstance.getAllAccounts().length > 0
  ) {
    msalInstance.setActiveAccount(
      msalInstance
        .getAllAccounts()
        .find(
          ({ environment, tenantId }) =>
            environment === VITE_MSAL_ENVIRONMENT &&
            tenantId === VITE_MSAL_TENANT_ID
        ) ?? null
    );
  }

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });
}

export default msalInstance;
