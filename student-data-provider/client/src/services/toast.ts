import { toast } from 'react-toastify';

export const showToast = (
  type: 'success' | 'error' | 'info' | 'warning',
  msg: string
) => {
  toast(`${msg}`, {
    type,
  });
};
