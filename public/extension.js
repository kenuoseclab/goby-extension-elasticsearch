function activate(content) {
    goby.registerCommand('elastic', (content) => {
        let path = __dirname + "/index.html?hostinfo=" + content.hostinfo;
        goby.showIframeDia(path, "Elasticsearch未授权漏洞利用", "600", "600");
    });

    goby.registerCommand('elastic_visi',  (content) => {
        return content.name === "Elasticsearch unauthorized"
    });
}

exports.activate = activate;