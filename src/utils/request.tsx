import axios from "axios";
import { notification } from "ant-design-vue";

export default function request(options: any) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(err => {
      const {
        response: { status, statusText }
      } = err as any;
      notification.error({
        message: (h: any) => {
          return (
            <div>
              error <span style="color: red">{status}</span>: {options.url}
            </div>
          );
        },
        description: statusText
      });
      return Promise.reject(err);
    });
}
