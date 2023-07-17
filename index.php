<?php  
  
$movieName = $_GET['movieName'];  
  
// 生成腾讯视频的播放网址  
$腾讯视频播放网址 = "https://v.qq.com/x/search/?q=" . urlencode($movieName);  
  
// 使用 cURL 发送 HTTP 请求  
$curl = curl_init();  
curl_setopt($curl, CURLOPT_URL, $腾讯视频播放网址);  
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);  
curl_setopt($curl, CURLOPT_HEADER, false);  
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);  
curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3");  
$response = curl_exec($curl);  
  
// 将结果以 JSON 格式返回  
header('Content-Type: application/json');  
echo json_encode(array('url' => $腾讯视频播放网址));  
?>