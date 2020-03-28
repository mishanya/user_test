const fetch = require('node-fetch');
const { User, ExternalEntry } = require(process.cwd() + "/models/index");
const {logger} = process;



module.exports = () => ExternalEntry.findByPk(1)
    .then(entry => {
        let { count, last_page } = entry;
        let fetchUsers = (pageNumber) => {
            fetch(`https://reqres.in/api/users?page=${pageNumber}`)
                .then(res => res.json())
                .catch(err =>  logger.log('error', err.json ? err.json() : err.toString()))
                .then(res => {

                    logger.log('info', 'Synced successfully, data: ' + JSON.stringify(res));

                    if (count >= res.total) return;
                    let newUsers = res.data.filter(user => user.id > count).map(user => delete user.id && user);

                    newUsers.length > 0 && User
                        .bulkCreate(newUsers)
                        .catch(err => logger.log('warn', err.toString()))
                        .then(() => {

                            res.page >= res.total_pages ? ExternalEntry.update({
                                count: res.total,
                                last_page: res.page
                            }, { where: { id: 1 } }) : fetchUsers(pageNumber + 1)
                        })

                })
        }

        fetchUsers(last_page);
    })