import ReactLoading from 'react-loading';
export default function Loading({ isLoading }) {
  return (
    <>
    {/* 頁面增加時需要加入useState isLoading 來判斷是否啟用Loading畫面*/}
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(2px)',
          }}
        >
          <ReactLoading type='bubbles' color='white' height={60} width={100} />
        </div>
      )}
    </>
  );
}

