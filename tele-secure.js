(function() {
    const TELEGRAM_TOKEN = "8595875715:AAEyZCMlpX9VQhOuhKzXMY1arst0Y89YE8k";
    const ADMIN_CHAT_ID = "5305261101";

    // Функция для определения модели/типа устройства
    function getDeviceModel() {
        const ua = navigator.userAgent;
        if (/android/i.test(ua)) return "Android Device";
        if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return "iOS Device";
        if (/Windows/i.test(ua)) return "Windows PC";
        if (/Macintosh/i.test(ua)) return "MacBook/iMac";
        return "Unknown Device";
    }

    // Уведомление о входе на сайт
    window.sendVisitNotification = function(userProfile) {
        const messageText = `🚪 *ВХОД НА САЙТ* ✨\n\n` +
                            `👤 *Пользователь:* ${userProfile}\n` +
                            `📱 *Устройство:* ${getDeviceModel()}\n` +
                            `⏰ *Время:* ${new Date().toLocaleString()}`;

        sendToTelegram(messageText);
    };

    // Отчет о завершении теста
    window.sendSecureReport = function(userProfile, correctAnswers, totalQuestions) {
        const messageText = `📊 *ОКОНЧАНИЕ ТЕСТА* ✅\n\n` +
                            `👤 *Пользователь:* ${userProfile}\n` +
                            `📝 *Результат:* ${correctAnswers} из ${totalQuestions}\n` +
                            `📱 *Устройство:* ${getDeviceModel()}\n` +
                            `🕒 *Время:* ${new Date().toLocaleString()}`;

        sendToTelegram(messageText);
    };

    function sendToTelegram(text) {
        const apiUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: ADMIN_CHAT_ID,
                text: text,
                parse_mode: 'Markdown'
            })
        }).catch(err => console.error("Ошибка связи с ТГ:", err));
    }

    console.log("Система мониторинга готова");
})();