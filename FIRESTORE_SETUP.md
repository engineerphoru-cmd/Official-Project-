u# Runfourcode Client Portal Setup

The portal stores client requests in Cloud Firestore. The browser pages are only the interface; Firestore Security Rules are what protect client and admin data.

## 1. Enable the Firebase products

In Firebase Console for project `official-project-70afc`:

1. Enable Google and Email/Password under Authentication > Sign-in method.
2. Add the deployed website hostname (and `localhost` for local development) under Authentication > Settings > Authorized domains.
3. Create a Cloud Firestore database in production mode and choose the region appropriate for your users.
4. Confirm the Firebase Web API key allows the Identity Toolkit API and the site origin in its Google Cloud API-key restrictions.

The Firebase Web config is included in `dashboard.html` and `admin.html`. Firebase web API keys are client identifiers, not admin credentials; never put a service-account key in either page.

## 2. Reserve the admin email

The client sign-up form blocks `ran4code@gmail.com` for usability. To enforce the restriction for all providers and prevent bypassing the browser, upgrade the Firebase project to Identity Platform and deploy the Authentication blocking function:

```sh
firebase deploy --only functions --project official-project-70afc
```

The `beforeUserCreated` function rejects new accounts using the reserved email while allowing the already-existing admin account to sign in. Keep the reserved email in sync in `functions/index.js`, `dashboard.html`, and `admin.html`. Do not store the admin password in source code; set or reset it in Firebase Authentication.

## 3. Publish Firestore rules

Copy `firestore.rules` into Firebase Console > Firestore Database > Rules and publish it. The rules enforce:

With the Firebase CLI installed and access to the project, the same rules can be deployed with:

```sh
firebase deploy --only firestore:rules --project official-project-70afc
```

- A signed-in client can create a request only for their own UID/email and can only read requests they own.
- Clients cannot change status, progress, admin notes, preview URLs, or update-feed documents.
- Admin access requires a protected `admins/{uid}` document with `active: true`.
- Only active admins can read all project requests and create/update admin-controlled project state.

Do not replace these rules with test mode or broad `allow read, write: if true` rules.

## 4. Provision the first admin

1. In Firebase Console > Authentication > Users, create or enable the admin Email/Password account.
2. Set its password in Firebase Authentication; do not put passwords in the website source code.
3. Open `/admin.html` and sign in with that account. The admin email field is prefilled for the configured admin account.
4. In Firebase Console > Authentication > Users, copy that account's UID.
5. In Firestore Data, create a collection named `admins`.
6. Create a document whose document ID is exactly that UID.
7. Add a boolean field `active` with value `true` and an `email` string for reference.

Admin documents cannot be created or edited from the website. To remove access, set `active` to `false` or delete the document in the Firebase Console.

If the admin page reports `permission-denied`, publish the rules from `firestore.rules` in Firebase Console > Firestore Database > Rules. The rules already permit an authenticated user to read their own `admins/{UID}` role document; do not loosen them to public reads. After publishing, confirm the document ID exactly matches the UID shown in Firebase Authentication > Users and that `active` is the boolean `true`, then reload `/admin.html`.

Open `/admin.html` while signed in as that account. The admin queue reads all requests and can approve, decline, change status/progress, add a client-facing note, and attach an HTTPS preview link. Each save writes a project update that appears in that client's dashboard in real time.

## 5. Data and notifications

Client submissions are saved to `projects/{projectId}` with owner identity, business/contact details, product type, idea, use case, goals, budget, and timeline. Admin status messages are saved under `projects/{projectId}/updates/{updateId}`. Client dashboard notifications are the live view of these project updates.

This static portal does not send separate admin email/push alerts and does not upload preview builds; admins attach a deployed HTTPS preview URL. A mail/push notification service or Firebase Storage integration would require a trusted backend/Cloud Function and its own rules.

## 6. Serve and verify

Use an HTTP(S) origin rather than opening the HTML files directly. For the local preview in this workspace:

- Client site: `http://localhost:8000/`
- Client dashboard: `http://localhost:8000/dashboard.html`
- Company admin: `http://localhost:8000/admin.html`

Before production, host the files on your production HTTPS domain, add that domain to Firebase Authorized domains and API-key referrers, publish `firestore.rules`, and provision the admin UID.
