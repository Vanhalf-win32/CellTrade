import React from "react";

const CheckPhoto = () => {
    
    return (
        <div>
            <div class="" id="check-photos">
				<div class="form__container form__container--sm form__container--center">
					<h1 class="form__title form__title--center">
						Проверка фотографий устройства
					</h1>
					<div class="form__content">
						<div class="form__column">
							<div class="form__description">
								<p class="form__paragraph">
									<b class="form__bold">Перейдите по ссылке с помощью QR-кода, ссылки или
										номера заявки</b>
								</p>
							</div>
							<div class="
								form__container
								form__container--light-gray
								form__container--padding
								form__container--indent-bottom"
                                >
								<p class="form__paragraph">Сфотографируйте QR-код</p>
									<img class="form__img" src="img/content/qr-code.jpg" alt="" width="450" height="450"
										aria-hidden="true" />
							</div>
								<div class="
									form__container
									form__container--light-gray
									form__container--padding
									form__container--indent-bottom
									">
									<p class="form__paragraph">
										или перейдите по этой ссылке
											<a class="form__link form__link--bold"
												href="https://smartprice/su/hMG38w">https://smartprice/su/hMG38w</a>
									</p>
								</div>
								<div class="
									form__container
									form__container--light-gray
									form__container--padding
									">
									<p class="form__paragraph">
							    		или введите этот код заявки на этой странице
											<a class="form__link form__link--bold"
												href="https://smartprice.ru/tradein/upload">https://smartprice.ru/tradein/upload</a>
									</p>
									<p class="
										form__paragraph
										form__paragraph--bold
										form__paragraph--xl
										form__paragraph--center
										">
										2705153
									</p>
								</div>
						</div>
					</div>
				</div>
			</div>
        </div>
    );
};

export default CheckPhoto;