# Runfourcode Firebase Auth Email Templates

These are copy-ready message fields for Firebase Authentication > Templates. Firebase's default action handler creates and validates the one-time links; keep `%LINK%` instead of pasting a sample `oobCode` URL.

## Shared Settings

- Sender name: `Runfourcode`
- From: Keep the Firebase-managed sender for this project unless custom SMTP is configured.
- Reply-to: `hello@runfourcode.com` only if this inbox is active and monitored. Otherwise leave Firebase's default reply-to.

## Email Address Verification

Subject:

```text
Verify your email for %APP_NAME%
```

Message:

```text
Hi %DISPLAY_NAME%,

Welcome to %APP_NAME%.

Confirm your email address to finish setting up your account:

%LINK%

If you did not create a %APP_NAME% account, you can safely ignore this message.

Runfourcode
Digital, made thoughtful.
```

## Password Reset

Subject:

```text
Reset your %APP_NAME% password
```

Message:

```text
Hello,

We received a request to reset the password for %EMAIL% on %APP_NAME%.

Choose a new password using this secure link:

%LINK%

If you did not request a password reset, you can safely ignore this email. Your password will not change unless you open the link and complete the reset.

Runfourcode
Digital, made thoughtful.
```

## Email Address Change

Subject:

```text
Your %APP_NAME% sign-in email was changed
```

Message:

```text
Hi %DISPLAY_NAME%,

A request was made to change the sign-in email for your %APP_NAME% account to:

%NEW_EMAIL%

If you did not request this change, use the secure link below to restore your previous sign-in email:

%LINK%

If you requested this change, no further action is needed.

Runfourcode
Digital, made thoughtful.
```

## Activation Checklist

- Enable Email/Password in Firebase Authentication > Sign-in method.
- Add the deployed site hostname in Firebase Authentication > Settings > Authorized domains.
- Save each subject and message in its matching Firebase template.
- Confirm the `hello@runfourcode.com` reply-to inbox is monitored before using it.
- Firebase's built-in templates control the sender and email layout. For branded HTML layouts, configure a custom email provider/backend; changing this website alone does not restyle Firebase's hosted emails.
