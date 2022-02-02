# 2022SV_BOOTCAMP_slangtranslator
## 미들레이어 및 백엔드 구축
현재, local환경에서 redis-server 구동 및 node.js와의 연결까지 구현

# 셋업 (Mac)
## Environments
MacBook Pro : 13-inch, M1, 2020
macOS : Big Sur (11.4.version)

### 1. Redis 모듈 설치
Redis 모듈은 Node.js용 Redis 클라이언트 라이브러리로, Redis 커맨드를 모두 지원합니다.
```
 npm install redis
```
### 2. hiredis 모듈 설치(선택!)
hiredis라는 공식적인 hiredis C 라이브러리를 바인딩하여 Non-Blocking의 빠른 모듈도 있는데 이를 설치하려면 아래 명령어를 입력합니다.
```
 npm install hiredis redis
```
### 3. Redis-Server 설치
Node.js에서 Redis를 연동시키기 위해서는, 먼저 Redis-Server가 구동되어야하는 전제가 필요합니다. 따라서, 로컬 저장소에 Redis-Server를 설치해줍니다.
```
 sudo apt-get install redis-server
```

# Code Explanation
```
...
var redis = require('redis');
...
```
Redis모듈을 전역 함수 require()을 이용하여 추출합니다.

```
...
var client = redis.createClient(6379, "127.0.0.1");
...
```
Redis모듈속의 createClient()함수를 이용하여, 해당 포트와 IP주소에 접근가능한 Client를 선언합니다.

```
...
await client.connect();

var value = await client.get('NAME');
console.log("get:" + value);

await client.disconnect;
...
```
만들어진 client객체를 연결시키고, get을 통해서, 현재 Redis에 저장된 NAME이라는 key값에 대응되는 value를 가져옵니다.</br>
(필자의 경우, 미리 Redis저장소에 NAME이라는 key값에 대응되는, value값을 저장시켜두었습니다.)</br>
그후, client의 연결을 끊습니다.

# 실행순서
```
redis-server
node redis.js
```
먼저, local에서 redis-server를 구동해둔뒤, 코드를 실행시켜야한다.

# TroubleShooting
```
var redis = require('redis');
var client = redis.createClient();           
client.on('error', function (err) {
    console.log('Error ' + err);
});

client.get('NAME', function(err, value){
    if(err) throw err;
    console.log(value);
});
```
위 코드는 맨 초기에 구글링을 통해서 찾아낸 코드, 대부분의 책이나 블로그를 찾아보면 위의 코드와 유사하게 작성하여, redis서버에 접속하라고 한다. 그러나, 해당 코드를 실행시키면 아래와 같은 에러가 발생할 수도 있다.
```
ClientClosedError: The client is closed
```
따라서, 해당 에러를 해결하기 위해, 3일간 서칭해본 결과, async를 이용하여 해결하는것을 권장하는 글을 찾게 되었고,</br>
(https://redis.js.org) <- 해당 사이트에 게시된 예제를 조금 변형하여 해결이 가능하였다.
따라서, 현재 게시한 코드가 해결된 코드이다.


