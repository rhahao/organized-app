import appDb from './db';

export const acknowledgeRequestApproval = async function (cong_number) {
  cong_number = +cong_number;

  await appDb.visiting_speakers.update(cong_number, {
    notif_dismissed: true,
    request_status: 'approved',
  });
};
