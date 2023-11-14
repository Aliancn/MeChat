// 设置数据到 localStorage
function SetItemWithExpiration(key, value, expirationInMinutes) {
    const now = new Date();
    const expirationTime = now.getTime() + expirationInMinutes * 60 * 1000; // 转换为毫秒

    const item = {
        value: value,
        expirationTime: expirationTime,
    };

    localStorage.setItem(key, JSON.stringify(item));
}

// 从 localStorage 获取数据
function GetItemWithExpiration(key) {
    const itemString = localStorage.getItem(key);

    if (!itemString) {
        return null;
    }

    const item = JSON.parse(itemString);
    const now = new Date();

    if (now.getTime() > item.expirationTime) {
        // 数据过期
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
}

export { SetItemWithExpiration, GetItemWithExpiration };