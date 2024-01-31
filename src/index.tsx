/*
Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import Auth from "./Auth";

import "./global.scss";
import { initializeMsalInstance } from "./Auth/msalInstance";

const queryClient = new QueryClient();
const root = createRoot(document.getElementById("root")!);

initializeMsalInstance().then(() => {
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Auth>
          <App />
        </Auth>
      </QueryClientProvider>
    </React.StrictMode>
  );
});
