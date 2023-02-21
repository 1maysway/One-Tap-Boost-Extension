// async function func() {
//     const token = "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";
//     let repositoryLink = "https://github.com/mayswayBoost/maysway-boost/tree/main";
//     let fileLink = "https://github.com/mayswayBoost/maysway-boost/blob/main/keyssss.json";

//     // add value to repository github function
//     async function addValueToRepository(value) {
//         const url = 'https://api.github.com/repos/username/repo-name/contents/file-name.json';
//         const token = 'token';
//         const response = await fetch(url, {
//             method: 'PUT',
//             headers: {
//                 'Authorization': `token ${token}`,
//                 'Accept': 'application/vnd.github.v3+json'
//             },
//             body: JSON.stringify({
//                 "message": "add value to repository",
//                 "content": btoa(value)
//             })
//         });
//         return await response.json();
//     }

//     // get value from repository github function
//     async function getValueFromRepository(url, token) {
//         //const url = 'https://api.github.com/repos/username/repo-name/contents/file-name.json';
//         //const token = 'token';
//         const response = await fetch(url, {
//             method: 'GET',
//             mode: 'no-cors',
//             headers: {
//                 'Authorization': `token ${token}`,
//                 'Accept': 'application/vnd.github.v3+json'
//             }
//         });
//
//         return await response.json();
//     }

//     // repository link to api repository link
//     function repositoryLinkToApiRepositoryLink(repositoryLink) {
//         let apiRepositoryLink = repositoryLink.replace("github.com", "api.github.com/repos");
//         apiRepositoryLink = apiRepositoryLink.replace("blob", "contents");
//         return apiRepositoryLink;
//     }

//     // add new file to github repository
//     async function addNewFileToGithubRepository(repositoryLink, fileName, fileContent, token) {
//         //let apiRepositoryLink = repositoryLinkToApiRepositoryLink(repositoryLink);
//         //let url = apiRepositoryLink + "/" + fileName;
//         let response = await fetch(repositoryLink, {
//             method: 'PUT',
//             headers: {
//                 'Authorization': `token ${token}`,
//                 'Accept': 'application/vnd.github.v3+json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 "message": "add new file to github repository",
//                 "content": btoa(fileContent)
//             })
//         });
//         return await response.json();
//     }

//     //const resp = await addNewFileToGithubRepository("https://github.com/mayswayBoost/maysway-boost/contents/keyssss.json", "Keys2", "asasd", token);
//     //

//     const octokit = new Octokit({
//         auth: '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'
//     });

//     await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
//         owner: 'mayswayBoost',
//         repo: 'maysway-boost',
//         path: '',
//         message: 'my commit message',
//         committer: {
//             name: 'maysway',
//             email: 'octocat@github.com'
//         },
//         content: 'bXkgbmV3IGZpbGUgY29udGVudHM='
//     });
// }

// //func();

const bstChannel = "-1001790668593";
const bstChat = "-1001648748431";
const reportChannel = "-1001831548372";
const reportChat = "-1001812737414";

let btnType;

$(".type").click(function() {
    btnType = this;

    $(".type").removeClass("disabled");
    this.classList.add("disabled");
});

$("#submit").click(async function() {
    // var onion = await fetch('https://raw.githubusercontent.com/1maysway/maysway-BeatBoost/main/options.json')
    //     .then((response) => response.json());

    let limitation = localStorage.getItem("limitation");

    switch ($(btnType).data("type")) {
        case "Boost":
            {
                if (limitation == "boost") {
                    let alert = confirm(
                        "Выбранный вариант является последним активированным. Вы уверены что хотите его запустить?"
                    );
                    if (alert == true) {
                        limitation = "none";
                        localStorage.setItem("limitation", limitation);
                    } else break;
                }

                const sendBoostStartResponse = await fetch(
                    "https://api.t-a-a-s.ru/client", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            api_key: randomApiKey(),
                            "@type": "sendMessage",
                            chat_id: bstChannel,
                            disable_notification: true,
                            input_message_content: {
                                "@type": "inputMessageText",
                                disable_web_page_preview: false,
                                text: {
                                    "@type": "formattedText",
                                    text: "Boost | " +
                                        getCurrentDate() +
                                        "\n\nКак составить ссылку для буста: https://t.me/c/1700159175/401 \n\nЗапускаем расширение в 15 минут",
                                },
                            },
                        }),
                    }
                );

                const sendBoostMessage = await sendBoostStartResponse.json();

                setTimeout(async function() {
                    let boostChatHistory = await getChatHistory(bstChannel, 30);
                    let boostMessageId = boostChatHistory.messages[0].id;

                    const sendReportStartResponse = await fetch(
                        "https://api.t-a-a-s.ru/client", {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                api_key: randomApiKey(),
                                "@type": "forwardMessages",
                                chat_id: reportChannel,
                                from_chat_id: bstChannel,
                                message_ids: [boostMessageId],
                                send_copy: false,
                                disable_notification: true,
                            }),
                        }
                    );

                    const sendReportMessage = await sendReportStartResponse.json();
                }, 3000);

                // 861929472

                setTimeout(async function() {
                    const sendReportMembersCompleteResponse = await fetch(
                        "https://api.t-a-a-s.ru/client", {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                api_key: randomApiKey(),
                                "@type": "sendMessage",
                                chat_id: reportChannel,
                                disable_notification: true,
                                input_message_content: {
                                    "@type": "inputMessageText",
                                    disable_web_page_preview: false,
                                    text: {
                                        "@type": "formattedText",
                                        text: "Members - COMPLETE | " +
                                            getCurrentDate() +
                                            ":" +
                                            getCurrentTime(),
                                    },
                                },
                            }),
                        }
                    );

                    const sendReportMembersComplete =
                        await sendReportMembersCompleteResponse.json();

                    setTimeout(async() => {
                        //const messages;
                        //let messageId = messages[0].id;

                        let messageId;
                        let count = 0;
                        while (!messageId && count < 5) {
                            const messages = await getChatHistoryOver(reportChat, 10);
                            let message = messages.find((x) =>
                                x.content.text ?
                                x.content.text.text.includes(
                                    "Members - COMPLETE | " + getCurrentDate()
                                ) :
                                false
                            );
                            messageId = message ? message.id : null;
                            count++;
                        }
                        if (!messageId) return;

                        const sendReportMembersCompleteResponse = await fetch(
                            "https://api.t-a-a-s.ru/client", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    api_key: randomApiKey(),
                                    "@type": "sendMessage",
                                    chat_id: reportChat,
                                    reply_to_message_id: messageId,
                                    disable_notification: true,
                                    input_message_content: {
                                        "@type": "inputMessageText",
                                        disable_web_page_preview: false,
                                        text: {
                                            "@type": "formattedText",
                                            text: "complete",
                                        },
                                    },
                                }),
                            }
                        );
                    }, 3000);

                    // setTimeout(async function() {
                    //     let reportChatHistory = await getChatHistory("-1001743027571", 1);
                    //     let reportMessageId = reportChatHistory.messages[0].id;
                    //
                    //     const sendReportMembersCompleteResponse = await fetch('https://api.t-a-a-s.ru/client', {
                    //         method: 'POST',
                    //         headers: {
                    //             'Accept': 'application/json',
                    //             'Content-Type': 'application/json'
                    //         },
                    //         body: JSON.stringify({
                    //             "api_key": randomApiKey(),
                    //             "@type": "sendMessage",
                    //             "chat_id": "-1001743027571",
                    //             "disable_notification": true,
                    //             "input_message_content": {
                    //                 "@type": "inputMessageText",
                    //                 "disable_web_page_preview": false,
                    //                 "text": {
                    //                     "@type": "formattedText",
                    //                     "text": reportMessageId.toString()
                    //                 }
                    //             }
                    //         })
                    //     });

                    //     const sendReportMembersComplete = await sendReportMembersCompleteResponse.json();
                    //
                    // }, 3000);
                }, 5000);

                // let reportChatHistory = await getChatHistory("-1001743027571");
                //
                // localStorage.setItem('membersCompleteId', reportChatHistory.messages[0].id);
                //

                localStorage.setItem("limitation", "boost");

                break;
            }
        case "Check":
            {
                if (limitation == "check") {
                    let alert = confirm(
                        "Выбранный вариант является последним активированным. Вы уверены что хотите его запустить?"
                    );
                    if (alert == true) {
                        limitation = "none";
                        localStorage.setItem("limitation", limitation);
                    } else break;
                }

                let reportChatHistory = await getChatHistoryOver(reportChannel, 10);

                let reportChatHistoryFilter = reportChatHistory; //.filter(i => /^Members - COMPLETE/.exec(i.content.text.text));

                // let reportChatHistoryFilterSort = reportChatHistoryFilter.sort((a, b) => {
                //

                //     let atext;
                //     let btext;
                //     try {
                //         //atext = a.content.text.text.split("| ")[1].split(":")[0].concat(a.content.text.text.split("| ")[1].split(":")[1]).split('.');

                //         atext = a.content.text.text.split("| ")[1].split(":").join('.').split('.');
                //     } catch (e) {
                //         return -1;
                //     }
                //     try {
                //         //btext = b.content.text.text.split("| ")[1].split(":")[0].concat(b.content.text.text.split("| ")[1].split(":")[1]).split('.');

                //         btext = b.content.text.text.split("| ")[1].split(":").join('.').split('.');
                //     } catch (e) {
                //         return 1;
                //     }

                //     // 2 arrays of strings to 1 array of strings
                //     let atext2 = atext[0].split("");

                //     const aint = atext.map(i => parseInt(i));
                //     const bint = btext.map(i => parseInt(i));

                //

                //     return (aint[0] - bint[0] && aint[1] - bint[1] &&
                //         aint[2] - bint[2] && aint[3] - bint[3] &&
                //         aint[4] - bint[4] && aint[5] - bint[5] &&
                //         aint[6] - bint[6]) ? 1 : -1;
                // }).reverse();

                console.log(reportChatHistoryFilter);

                let message = reportChatHistoryFilter.find((x) =>
                    x.content.text ?
                    x.content.text.text.includes(
                        "Members - COMPLETE | " + getCurrentDateSamaraNoApi()
                    ) :
                    false
                );

                console.log(message);
                let id = message.id;

                const getMembersCompleteResponse = await recursiveFetchAwait(
                    "https://api.t-a-a-s.ru/client", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            api_key: randomApiKey(),
                            "@type": "getMessageThreadHistory",
                            chat_id: reportChannel,
                            message_id: id,
                            from_message_id: "0",
                            limit: "200",
                            offset_order: "9223372036854775807",
                        }),
                    }
                );

                // const getMembersCompleteResponse = await fetch('https://api.t-a-a-s.ru/client', {
                //     method: 'POST',
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         "api_key": randomApiKey(),
                //         "@type": "getMessageThreadHistory",
                //         "chat_id": "-1001743027571",
                //         // "message_id": reportChatHistory.messages[0].id,
                //         "message_id": id,
                //         "from_message_id": "0",
                //         "limit": "200",
                //         "offset_order": "9223372036854775807"
                //     })
                // });

                const membersCompleteResponse = await getMembersCompleteResponse.json();
                let completeMembers = membersCompleteResponse.messages;

                let completeMembersNames = completeMembers.map(
                    (message) => message.content.text.text.split("|")[0]
                );
                completeMembersNames = completeMembersNames.filter((text) =>
                    text.includes("@")
                );

                console.log("COMPLETE MEMBERS ->", completeMembersNames); ///////////////////////////////

                let membersChatHistory = await getChatHistoryOver(bstChannel, 50);

                let membersId = membersChatHistory.find(
                    (
                        x //.filter(i => i.content.text ? /^Boost/.exec(i.content.text.text) : false)
                    ) =>
                    x.content.text ?
                    x.content.text.text.includes(
                        "Boost | " + getCurrentDateSamaraNoApi()
                    ) :
                    false
                ).id;

                const getMembersResponse = await recursiveFetchAwait(
                    "https://api.t-a-a-s.ru/client", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            api_key: randomApiKey(),
                            "@type": "getMessageThreadHistory",
                            chat_id: bstChannel,
                            message_id: membersId,
                            from_message_id: "0",
                            limit: "200",
                            offset_order: "9223372036854775807",
                        }),
                    }
                );

                const membersResponse = await getMembersResponse.json();

                let members = membersResponse.messages;

                let membersIds = members.map(
                    (i) => i.sender_id.user_id || i.sender_id.chat_id
                );

                //let membersNames = await members.map(i => await getUserInfo(i).then(i => i.username));
                let membersNames = await Promise.all(
                    membersIds.map(
                        async(i) => await getUserInfo(i).then((i) => "@" + i.username)
                    )
                );

                console.log("MEMBERS ->", membersNames); ////////////////////////////////////

                // let notCompleteMembers = membersNames.filter(function(member) {
                //     return completeMembersNames.includes(member) == false;
                // });

                // let notCompleteMembers = completeMembersNames.filter(function(member) {
                //     return !membersNames.includes(member);
                // });

                let notCompleteMembers = membersNames.filter((member) => {
                    // console.log("non complete filter", completeMembersNames, member, completeMembers.includes(member));
                    return !completeMembersNames.includes(member);
                });

                console.log("NOT COMPLETE MEMBERS NAMES->", notCompleteMembers);

                let NotCompleteMembersStatus = await getChatHistoryOver(
                    reportChannel,
                    10
                )

                let NotCompleteMembersStatusMessage = NotCompleteMembersStatus.find((x) =>
                    x.content.text ?
                    x.content.text.text.includes("NOT COMPLETE | " + getSamaraDate(-1)) :
                    false
                )

                console.log(NotCompleteMembersStatusMessage, getSamaraDate(-1));

                let NotCompleteMembersStatusId = NotCompleteMembersStatusMessage.id;

                const getNotCompleteMembersStatusResponse = await recursiveFetchAwait(
                    "https://api.t-a-a-s.ru/client", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            api_key: randomApiKey(),
                            "@type": "getMessageThreadHistory",
                            chat_id: reportChannel,
                            message_id: NotCompleteMembersStatusId,
                            from_message_id: "0",
                            limit: "200",
                            offset_order: "9223372036854775807",
                        }),
                    }
                );

                const notCompleteMembersStatusResponse =
                    await getNotCompleteMembersStatusResponse.json();

                let notCompleteMembersStatus =
                    notCompleteMembersStatusResponse.messages.map(
                        (msg) => msg.content.text.text
                    );

                console.log("PREV NOT COMPLETE MEMBERS ->", notCompleteMembersStatus); ////////////////////////////////////

                let notCompleteMembersStatusFilter = notCompleteMembersStatus.filter(
                    function(message) {
                        if (message.includes("KICK") || !message.includes("@")) {
                            return false;
                        }
                        return true;
                    }
                );

                let newNotCompleteMembersStatus = notCompleteMembersStatusFilter.map(
                    (message) => {
                        if (notCompleteMembers.includes(message.split(" | ")[0])) {

                            if (message.includes('1/3')) {
                                return message.split(" | ")[0] + " | 2/3";
                            } else {
                                return message.split(" | ")[0] + " | " + "KICK";
                            }
                        } else {
                            return message;
                        }
                    }
                );

                // let notCompleteMembersStatusNames = (newNotCompleteMembersStatus.length == 0 ? [] : newNotCompleteMembersStatus.map(message => message.split(' | ')[0]));
                //

                const newNotCompleteMembersStatusNames = newNotCompleteMembersStatus.map(
                    (member) => member.split(" |")[0]
                );

                notCompleteMembers.forEach((member) => {
                    if (!newNotCompleteMembersStatusNames.includes(member)) {
                        newNotCompleteMembersStatus.push(member + " | " + "1/2");
                    }
                });

                if (newNotCompleteMembersStatus.length == 0)
                    newNotCompleteMembersStatus.push("All users have completed the boost");

                console.log("NEW NOT COMPLETE MEMBERS ->", newNotCompleteMembersStatus); ////////////////////////////////////////////////

                const sendNotCompletedMembersStatus = await recursiveFetchAwait(
                    "https://api.t-a-a-s.ru/client", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            api_key: randomApiKey(),
                            "@type": "sendMessage",
                            chat_id: reportChannel,
                            disable_notification: true,
                            input_message_content: {
                                "@type": "inputMessageText",
                                disable_web_page_preview: false,
                                text: {
                                    "@type": "formattedText",
                                    text: "Members - NOT COMPLETE | " + getCurrentDateSamaraNoApi(),
                                },
                            },
                        }),
                    }
                );

                const sendBoostNotCompletedMembersStatus = await recursiveFetchAwait(
                    "https://api.t-a-a-s.ru/client", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            api_key: randomApiKey(),
                            "@type": "sendMessage",
                            chat_id: bstChannel,
                            disable_notification: true,
                            input_message_content: {
                                "@type": "inputMessageText",
                                disable_web_page_preview: false,
                                text: {
                                    "@type": "formattedText",
                                    text: "Members - NOT COMPLETE | " + getCurrentDateSamaraNoApi(),
                                },
                            },
                        }),
                    }
                );

                setTimeout(async function() {
                    let notCompleteStatusChatHistory = await getChatHistoryOver(
                        reportChat,
                        200
                    );

                    let replyId = notCompleteStatusChatHistory.find((x) =>
                        x.content.text ?
                        x.content.text.text.includes(
                            "NOT COMPLETE | " + getCurrentDateSamaraNoApi()
                        ) :
                        false
                    ).id; //.filter(i => i.content.text ? /^Members - NOT COMPLETE/.exec(i.content.text.text) : false)[0];

                    console.log("REPLY ID -> " + replyId);
                    let boostNotCompleteStatusChatHistory = await getChatHistoryOver(
                        bstChat,
                        200
                    );

                    // boostNotCompleteStatusChatHistory.forEach(
                    //     async function(message) {
                    //
                    //     }
                    // );

                    let boostReplyId = boostNotCompleteStatusChatHistory.find((x) =>
                        x.content.text ?
                        x.content.text.text.includes(
                            "NOT COMPLETE | " + getCurrentDateSamaraNoApi()
                        ) :
                        false
                    ).id; //.filter(i => i.content.text ? /^Members - NOT COMPLETE/.exec(i.content.text.text) : false)[0].id;

                    console.log("BOOST REPLY ID -> " + boostReplyId);
                    // newNotCompleteMembersStatus.forEach(member => {
                    //
                    //     // const sendReportStartResponse = await fetch('https://api.t-a-a-s.ru/client', {
                    //     //     method: 'POST',
                    //     //     headers: {
                    //     //         'Accept': 'application/json',
                    //     //         'Content-Type': 'application/json'
                    //     //     },
                    //     //     body: JSON.stringify({
                    //     //         "api_key": randomApiKey(),
                    //     //         "@type": "sendMessage",
                    //     //         "chat_id": "-1001743027571",
                    //     //         "reply_to_message_id": replyId,
                    //     //         "disable_notification": true,
                    //     //         "input_message_content": {
                    //     //             "@type": "inputMessageText",
                    //     //             "disable_web_page_preview": false,
                    //     //             "text": {
                    //     //                 "@type": "formattedText",
                    //     //                 "text": member
                    //     //             }
                    //     //         }
                    //     //     })
                    //     // });
                    //     await sendMessage("-1001523814781", member, replyId);
                    //     await sendMessage("-1001629362479", member, boostReplyId);
                    // });

                    await Promise.all(
                        newNotCompleteMembersStatus.map(async(member) => {
                            console.log("SEND NOT COMPETED -> " + member);
                            const send = await sendMessage(reportChat, member, replyId);
                            const sendBoost = await sendMessage(bstChat, member, boostReplyId);
                        })
                    );
                }, 10000);

                localStorage.setItem("limitation", "check");

                break;
            }
    }
});

async function getUserInfo(userId) {
    const getUserInfoResponse = await fetch("https://api.t-a-a-s.ru/client", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            api_key: randomApiKey(),
            "@type": "getUser",
            user_id: userId,
        }),
    });
    const userInfoResponse = await getUserInfoResponse.json();
    return userInfoResponse;
}

// get current date
function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "." + mm + "." + yyyy;
    return today;
}

// get chat history
async function getChatHistory(chat_id, limit) {
    const getChatHistoryResponse = await fetch("https://api.t-a-a-s.ru/client", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            api_key: randomApiKey(),
            "@type": "getChatHistory",
            chat_id: chat_id,
            limit: limit,
            offset_order: "9223372036854775807",
        }),
    });
    return getChatHistoryResponse.json();
}

// random api key
function randomApiKey() {
    let keys = [
        "89021593540:w4oe9g4454SZjPiCexhdVHs6ziMHAr1axGceJhz8",
        "89021593540:5AFou-ZcsdzTAqW7xAsAjTS16kYV7sC9Aq2eNHmt",
    ];
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    return randomKey;
}

// send message

async function sendMessage(chat_id, text, replyId) {
    const sendMessageResponse = await fetch("https://api.t-a-a-s.ru/client", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            api_key: randomApiKey(),
            "@type": "sendMessage",
            chat_id: chat_id,
            reply_to_message_id: replyId,
            disable_notification: true,
            input_message_content: {
                "@type": "inputMessageText",
                disable_web_page_preview: false,
                text: {
                    "@type": "formattedText",
                    text: text,
                },
            },
        }),
    });
    return sendMessageResponse.json();
}

async function getChatHistoryOver(chat_id, limit) {
    let messages = [];
    let fromId = 0;
    let count = 0;
    let prevLength = 0;
    let prevLengthCount = 0;

    while (messages.length < limit && count < 10) {
        const chatHistoryResponse = await fetch("https://api.t-a-a-s.ru/client", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api_key: randomApiKey(),
                "@type": "getChatHistory",
                chat_id: chat_id,
                limit: limit,
                offset: "0",
                from_message_id: fromId,
            }),
        });

        let chatHistory = await chatHistoryResponse.json();

        if (chatHistory.messages.length >= 1) {
            fromId = chatHistory.messages[chatHistory.messages.length - 1].id;
            messages = messages.concat(chatHistory.messages);
            prevLengthCount = 0;
        } else {
            prevLengthCount++;
        }
        if (chatHistory.messages.length === prevLength && prevLengthCount >= 2) {
            console.log(messages);
            return messages;
        }

        prevLength = chatHistory.messages.length;
        count++;
    }
    console.log(messages);
    return messages;
}

async function recursiveFetchAwait(url, options, maxAttempts = 5) {
    if (maxAttempts > 0) {
        try {
            let response = await fetch(url, options);
            return response;
        } catch (e) {
            return await recursiveFetchAwait(url, options, maxAttempts - 1);
        }
    } else {
        throw new Error("Maximum attempts reached");
    }
}

// get current time
function getCurrentTime() {
    var today = new Date();
    var hh = String(today.getHours()).padStart(2, "0");
    var mm = String(today.getMinutes()).padStart(2, "0");
    var ss = String(today.getSeconds()).padStart(2, "0");

    today = hh + "." + mm + "." + ss;
    return today;
}

function getCurrentDateSamaraNoApi(daysToAdd = 0) {
    const millisecondsToAdd = daysToAdd * 24 * 60 * 60 * 1000;
    let date = new Date();
    let utc = date.getTime() + date.getTimezoneOffset() * 60000;
    let samara = new Date(utc + millisecondsToAdd + 3600000 * 3);
    let day = samara.getDate();
    let month = samara.getMonth() + 1;
    let year = samara.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return day + "." + month + "." + year;
}

// function getSamaraDate(daysToAdd = 0) {
//     const samaraTimezoneOffset = 3; // hours
//     const currentDate = new Date();
//     const currentTime = currentDate.getTime();
//     const millisecondsToAdd = daysToAdd * 24 * 60 * 60 * 1000;
//     const samaraTime = new Date(
//         currentTime + millisecondsToAdd + samaraTimezoneOffset * 60 * 60 * 1000
//     );
//     const day = samaraTime.getDate();
//     const month = samaraTime.getMonth() + 1;
//     const year = samaraTime.getFullYear();
//     return `${day}.${month < 10 ? "0" + month : month}.${year}`;
// }

function getSamaraDate(daysToAdd = 0) {
    const millisecondsToAdd = daysToAdd * 24 * 60 * 60 * 1000;
    let date = new Date();
    let utc = date.getTime() + date.getTimezoneOffset() * 60000;
    let samara = new Date(utc + millisecondsToAdd + 3600000 * 3);
    let day = samara.getDate();
    let month = samara.getMonth() + 1;
    let year = samara.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return day + "." + month + "." + year;
}