// 更新状态显示
function updateStatus(message, type = 'info') {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
    if (type === 'success') {
        statusElement.style.color = 'green';
    } else if (type === 'error') {
        statusElement.style.color = 'red';
    } else {
        statusElement.style.color = '#555';
    }
}

// 发送 API 请求
async function callAPI() {
    const msg = document.getElementById('msg').value;
    const sendBtn = document.getElementById('sendBtn');

    // 禁用按钮，避免重复提交
    sendBtn.disabled = true;
    updateStatus('请求发送中，请稍候...', 'info');

    // 构造请求的 URL
    const url = `https://api.317ak.com/API/AI/deepseek/deepseek3.0.php?msg=${encodeURIComponent(msg)}&type=json`;

    try {
        console.log(`准备发送请求，消息内容：${msg}`);
        console.log(`请求的 URL：${url}`);

        // 使用 fetch 请求 API，确保使用 GET 请求
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // 设置请求头
                'Accept': 'application/json' // 添加 Accept 头
            },
        });

        console.log('收到响应，检查响应状态...');
        
        // 检查响应状态是否为成功
        if (!response.ok) {
            throw new Error(`网络响应不可用，状态码: ${response.status}`);
        }

        console.log(`响应成功，状态码: ${response.status}`);
        console.log('准备解析 JSON 数据...');
        const data = await response.json();

        // 判断请求是否成功
        if (data.success) {
            console.log('请求成功，响应内容:', data.content);
            console.log('Token 使用情况:', data.usage);
            updateStatus('请求成功！查看控制台获取更多信息。', 'success');
        } else {
            console.log('请求失败，返回数据：', data);
            updateStatus('请求失败，请查看控制台详情。', 'error');
        }
    } catch (error) {
        console.error(`请求出错：${error.message}`);
        updateStatus(`请求出错：${error.message}`, 'error');
    } finally {
        // 请求完成后启用按钮
        sendBtn.disabled = false;
    }
}
