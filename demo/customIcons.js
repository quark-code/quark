import { Icon } from '@quark-elements/quark';

const editIcon = '<g><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>';
const errorIcon = '<g><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>';

export function EditIcon(name = 'edit-icon') {
    Icon(name, editIcon);
}

export function ErrorIcon(name = 'error-icon') {
    Icon(name, errorIcon);
}