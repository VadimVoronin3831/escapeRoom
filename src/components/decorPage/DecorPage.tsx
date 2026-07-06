import { convertImgSize } from '../../utils';

type DecorPageProps = {
  isLogin: boolean;
  jpgImg: string | null;
  webpImg: string | null;
};

function DecorPage({ isLogin, jpgImg, webpImg }: DecorPageProps): JSX.Element {
  return (
    <>
      {isLogin && (
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
            />
            <img
              src="img/content/maniac/maniac-size-m.jpg"
              srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x"
              width={1366}
              height={768}
              alt=""
            />
          </picture>
        </div>
      )}

      {!isLogin && (
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={webpImg ? `${webpImg} ${convertImgSize(webpImg)}` : 'img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x'} //"img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
            />
            <img
              src={jpgImg ? jpgImg : 'img/content/maniac/maniac-bg-size-m.jpg'}
              srcSet={jpgImg ? convertImgSize(jpgImg) : 'img/content/maniac/maniac-bg-size-m@2x.jpg 2x'}
              width={1366}
              height={1959}
              alt=""
            />
          </picture>
        </div>
      )}
    </>
  );
}

export default DecorPage;
