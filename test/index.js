import test from 'ava';
import { download } from '../lib/utils';
import Mutt from '../lib';

test('Yay!', async (t) => {
    const info1 = await download({ link: 'https://c4.staticflickr.com/5/4146/5014496307_c72ef6f6c4.jpg' }),
        info2 = await download({ key: 'subscription-renewals/adhoc-test.out', bucket: 'hooq-tests' });
    t.truthy(info1);
    t.truthy(info2);
});

test('Nay!', async (t) => {
    try {
        await download({ key: 'subscription-renewals/adhoc-test.out', bucket: 'bucket-not-exists' });
    } catch (error) {
        t.deepEqual(error.message, '404');
        t.truthy(error);
    }
});

test('Send', async (t) => {
    const mail = new Mutt({
        from: 'The Odin <odin@hooq.tv>',
        to: [ 'dio@hooq.tv' ],
        subject: 'Subject 1',
        body: 'Body 1',
        attachments: [
            { key: 'subscription-renewals/adhoc-test.out', bucket: 'hooq-tests', ext: '.csv' },
            { link: 'https://c4.staticflickr.com/5/4146/5014496307_c72ef6f6c4.jpg' }
        ]
    });
    await mail.send();
});
